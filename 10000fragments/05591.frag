uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 2.02 * sin(t * 1.25) + t * 5.49 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.97;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.98) * p * 8.09;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.71;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = mix(vec3(0.85, 0.94, 0.76), vec3(0.10, 0.07, 0.09), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
