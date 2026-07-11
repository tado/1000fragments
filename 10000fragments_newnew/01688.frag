uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.42 * sin(mf + 3.0) + ph), cos(t * 1.80 * cos(mf + 3.0) + ph));
        ms += 0.029 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.36;
	p = rot2(p.y * 1.28 + time * 0.25) * p;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.62; }
	p = rot2(length(p) * -2.71 + time * 1.25) * p;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.13;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.47, 0.99, 0.67) * (0.13 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
