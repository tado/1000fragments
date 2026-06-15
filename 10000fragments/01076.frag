uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.85 + sr * 8.66 - t * 4.59 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.84;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.32; p = rot2(1.87) * p; }
	p = rot2(p.y * -3.70 + time * 0.16) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.11, vec3(0.51, 0.55, 0.40), vec3(0.41, 0.42, 0.33), vec3(0.89, 1.36, 1.22), vec3(0.33, 0.03, 0.74));
	col = mod(col * 1.40, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
