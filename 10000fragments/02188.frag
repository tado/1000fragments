uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.52, t * 0.67 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.16; p = rot2(1.48) * p; }
	p = rot2(time * 1.21) * p;
	p *= 3.10;
	p = sin(p * 2.39 + time * 0.88) * 0.87;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.28, 0.18, 0.62) * (0.10 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
