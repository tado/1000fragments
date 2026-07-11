uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 6.27 * sin(t * 1.36) + t * 5.79 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.78;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.27) * p * 22.12;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.60;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = mix(vec3(0.09, 0.06, 0.13), vec3(0.96, 0.89, 0.97), v);
	col *= 0.84 + 0.11 * sin(gl_FragCoord.y * 2.65 + time * 12.80);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
