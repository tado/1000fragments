uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.58 + 0.25 * cos(sa * 8 + t * 1.09 + ph);
    v = sin((sr - petal) * 9.21);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.21;
	p = rot2(time * 0.90) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.38; p = rot2(0.89) * p; }
	p += vec2(-0.53, -0.56) * sin(length(p) * 5.22 - time * 0.76) * 0.37;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.12, vec3(0.53, 0.52, 0.43), vec3(0.32, 0.42, 0.36), vec3(1.11, 1.18, 1.14), vec3(0.85, 0.45, 0.51));
	col = fract(col * 1.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
