uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.21 + vec2(t * 2.49, -t * 2.08) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.17;
	p *= 1.0 + 0.22 * sin(time * 3.92);
	p.x += sin(p.y * 5.23 + time * 1.90) * 0.28;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.28 + time * 0.12);
	col = mod(col * 2.63, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
