uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.42 + 0.23 * pow(abs(cos(ra * 4.0 + t * 1.20)), 1.07);
    v = sin((rr - pet) * 8.73 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.03;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.50) * p * 18.94;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.67;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = mix(vec3(0.95, 0.93, 0.70), vec3(0.08, 0.03, 0.13), v);
	col = mod(col * 1.87, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
