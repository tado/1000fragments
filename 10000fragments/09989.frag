uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.13 * cos(sa * 4 + t * 1.97 + ph);
    v = sin((sr - petal) * 19.86);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.36;
	p *= 2.48;
	p = rot2(time * -1.35) * p;
	p = rot2(length(p) * -1.49 + time * 0.72) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.25; p = rot2(0.76) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.04), field(p, time, 2.08));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
