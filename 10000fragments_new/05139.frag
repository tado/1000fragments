uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.32 + sr * 14.81 - t * 2.23 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.77;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.17; p = rot2(1.55) * p; }
	p = (floor(p * 25.8) + 0.5) / 25.8;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.90), field(p, time, 1.81));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
