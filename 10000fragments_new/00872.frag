uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 13.23 + t * 0.80 + ph) * 0.7;
    float wb = sin(p.y * 15.31 - t * 3.46 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.20;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.85;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.38; p = rot2(2.53) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.73 + time * 0.04, vec3(0.54, 0.42, 0.42), vec3(0.43, 0.37, 0.39), vec3(1.05, 0.95, 0.79), vec3(0.42, 0.69, 0.49));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
