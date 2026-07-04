uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.31, t * 0.60 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.98; }
	p += vec2(0.13, -0.64) * sin(length(p) * 5.40 - time * 1.48) * 0.11;
	p *= 1.0 + 0.36 * sin(time * 1.77);
	p = rot2(time * -0.87) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.26, 0.60, 0.62) * (0.09 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
