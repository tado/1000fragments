uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.44 + vec2(t * 1.65, -t * 1.65) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(0.32) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.14; p = rot2(0.52) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.86 + time * 0.20, vec3(0.50, 0.50, 0.54), vec3(0.38, 0.42, 0.35), vec3(1.33, 0.83, 0.83), vec3(0.88, 0.54, 0.46));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
