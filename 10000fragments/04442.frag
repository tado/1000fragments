uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.43 + vec2(t * 2.57, -t * 2.57) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 2.93) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.75 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.43 + time * 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
