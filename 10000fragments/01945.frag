uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.20, 0.0)) * 34.86 - t * 4.46 + ph);
    float mb = sin(length(p + vec2(0.20, 0.0)) * 25.40 - t * 6.08 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.08) * p * 16.75;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.70;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = palette(d * 0.75 + time * 0.22, vec3(0.53, 0.50, 0.42), vec3(0.39, 0.35, 0.42), vec3(1.06, 0.73, 0.88), vec3(0.60, 0.27, 0.66)) * v;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
