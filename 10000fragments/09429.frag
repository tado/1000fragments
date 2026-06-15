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
    v = sin(sa * 5.45 + sr * 21.46 - t * 2.40 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.59;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.30; p = rot2(1.99) * p; }
	p = rot2(time * 0.72) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.90 + time * 0.18, vec3(0.44, 0.42, 0.45), vec3(0.49, 0.34, 0.47), vec3(1.39, 1.12, 0.71), vec3(0.30, 0.76, 0.50));
	col = mod(col * 2.00, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
