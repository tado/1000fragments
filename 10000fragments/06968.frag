uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.75 + t * 2.63 + ph) + sin(p.y * 7.99 - t * 4.26 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.84;
	{ float fr = length(p); p *= 1.0 + 0.23 * fr * fr; }
	p *= 3.11;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.77 + time * 0.21, vec3(0.60, 0.48, 0.56), vec3(0.38, 0.45, 0.36), vec3(1.18, 1.13, 1.08), vec3(0.82, 0.57, 0.56));
	col = fract(col * 1.66);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
