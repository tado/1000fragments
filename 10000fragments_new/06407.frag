uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.47, t * 1.28 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.81;
	p = rot2(time * 1.58) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.10; p = rot2(2.38) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.77 + time * 0.20);
	col = mod(col * 2.12, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
