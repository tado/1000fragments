uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 7.59 * sin(t * 1.05) + t * 2.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.84;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.66) * p * 10.66;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.62;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = mix(vec3(0.03, 0.11, 0.07), vec3(0.95, 0.72, 0.67), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
