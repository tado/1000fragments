uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.02 + vec2(t * 2.74, -t * 2.74) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.30;
	{ float fr = length(p); p *= 1.0 + -0.38 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.94 + time * 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
