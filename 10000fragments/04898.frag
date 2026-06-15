uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.95 + vec2(t * 2.63, -t * 2.63) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.40; p = rot2(1.90) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.63 + time * 0.04, vec3(0.44, 0.56, 0.52), vec3(0.35, 0.33, 0.33), vec3(0.81, 0.78, 1.28), vec3(0.44, 0.70, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
