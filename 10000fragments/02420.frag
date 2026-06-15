uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.58 + 0.23 * cos(sa * 9 + t * 2.26 + ph);
    v = sin((sr - petal) * 17.95);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.52; p = rot2(1.06) * p; }
	p = rot2(length(p) * -1.29 + time * 0.36) * p;
	p *= 2.91;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.39), field(p, time, 0.77));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
