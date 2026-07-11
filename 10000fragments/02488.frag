uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.60 + 0.19 * cos(sa * 7 + t * 0.69 + ph);
    v = sin((sr - petal) * 12.02);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.40;
	p = fract(p * 1.06) - 0.5;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.27; p = rot2(1.76) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.30, 0.99, 1.54) + vec3(0.09, 0.07, 0.24);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
