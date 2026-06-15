uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.63 + vec2(t * 2.35, -t * 2.35) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.40;
	{ p = vec2(atan(p.y, p.x) * 1.57, length(p) * 2.17 - time * 0.16); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.52; p = rot2(1.54) * p; }
	p *= 1.66;
	p = fract(p * 2.36) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.23 + time * 0.02, vec3(0.59, 0.59, 0.41), vec3(0.40, 0.33, 0.45), vec3(1.36, 1.11, 0.77), vec3(0.79, 0.49, 0.18));
	col = mod(col * 2.95, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
