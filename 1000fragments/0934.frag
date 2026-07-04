uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 9.0 + qr * 2.16 * sin(t * 0.69) + t * 4.17 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.96) * p * 16.98;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.53;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = mix(vec3(0.82, 0.75, 0.87), vec3(0.00, 0.14, 0.07), v);
	col *= 0.89 + 0.13 * sin(gl_FragCoord.y * 1.00 + time * 4.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
