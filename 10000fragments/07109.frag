uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.29, t * 2.15 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.59 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.11, length(p) * 4.13 - time * 0.75); }
	p = fract(p * 2.32) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.97 + time * 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
