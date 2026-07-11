uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.67 + 0.25 * cos(sa * 3 + t * 2.90 + ph);
    v = sin((sr - petal) * 15.69);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 2.04) - 0.5;
	p = rot2(length(p) * -1.40 + time * 0.76) * p;
	p += vec2(0.48, 0.45) * sin(length(p) * 5.14 - time * 1.03) * 0.18;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.16, 0.40, 0.23), vec3(0.97, 0.55, 0.99), d);
	col = clamp((col - 0.5) * 1.41 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
