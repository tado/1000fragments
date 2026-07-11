uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 13.64 - t * 5.83 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 25.91 - t * 5.00 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.33;
	{ p = vec2(atan(p.y, p.x) * 2.63, length(p) * 3.22 - time * 0.25); }
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.81; }
	p = rot2(0.41) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.34), field(p, time, 0.69));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
