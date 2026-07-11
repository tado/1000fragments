uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.19, t * 1.71 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.69;
	{ p = vec2(atan(p.y, p.x) * 2.56, length(p) * 3.36 - time * 0.34); }
	p.x += sin(p.y * 3.82 + time * 1.29) * 0.12;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.60 + time * 0.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
