uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 35.97 - t * 1.57 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 34.55 - t * 1.57 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 3.26 + time * 0.66) * p;
	p = rot2(2.28) * p;
	p *= 2.44;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.41; p = rot2(0.61) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.37), field(p, time, 2.74));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.99 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
