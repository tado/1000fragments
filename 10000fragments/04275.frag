uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.42, 0.0)) * 29.52 - t * 6.75 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 23.93 - t * 6.75 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.41;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.36; p = rot2(1.98) * p; }
	p = rot2(p.y * 2.72 + time * 0.96) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.29), field(p, time, 0.59));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.11, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
