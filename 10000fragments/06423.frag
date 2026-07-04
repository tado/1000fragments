uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.33;
    v = 0.5 * (sin(4.0 * cp.x + t * 1.03) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 2.88) * sin(4.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * 2.36 + time * 0.42) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.48; p = rot2(0.93) * p; }
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.73; }
	p.y += sin(p.x * 7.88 + time * 3.52) * 0.17;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.84, 0.74, 0.45) * (0.19 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= 0.81 + 0.19 * sin(gl_FragCoord.y * 1.29 + time * 17.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
