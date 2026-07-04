uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.14 - t * 0.70;
    v = sin(floor(lv * 5.6) / 5.6 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = (floor(p * 19.0) + 0.5) / 19.0;
	{ float fr = length(p); p *= 1.0 + 0.69 * fr * fr; }
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.76; }
	p = rot2(time * 0.81) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.65, 0.57, 0.78) * (0.06 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= 0.86 + 0.12 * sin(gl_FragCoord.y * 2.07 + time * 8.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
