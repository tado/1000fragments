uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.15 * cos(sa * 3 + t * 0.87 + ph);
    v = sin((sr - petal) * 9.21);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.31; p = rot2(0.95) * p; }
	p += vec2(-0.84, 0.12) * sin(length(p) * 3.81 - time * 1.54) * 0.34;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.30), field(p, time, 2.60));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.34, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
