uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.69 + 0.26 * cos(sa * 6 + t * 1.96 + ph);
    v = sin((sr - petal) * 19.60);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.68) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.57; p = rot2(0.78) * p; }
	p = rot2(p.y * -1.64 + time * 0.55) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.06, 0.44, 0.47), vec3(0.99, 0.79, 0.42), d);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
