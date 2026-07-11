uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 35.44 - t * 1.55 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 34.50 - t * 1.55 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	p = rot2(p.y * 1.43 + time * 0.31) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.51; p = rot2(0.40) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.49 + time * 0.19, vec3(0.43, 0.48, 0.58), vec3(0.49, 0.32, 0.43), vec3(0.78, 0.86, 1.39), vec3(0.71, 0.68, 0.32));
	col = clamp((col - 0.5) * 1.63 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
