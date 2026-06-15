uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.64 - t * 3.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.25) * p;
	{ float fr = length(p); p *= 1.0 + 0.42 * fr * fr; }
	p = fract(p * 1.95) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.20, 0.25, 0.53), vec3(0.61, 0.50, 0.69), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
