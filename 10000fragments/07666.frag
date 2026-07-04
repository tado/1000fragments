uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.78 + vec2(t * 0.50, -t * 0.55) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.48 + time * 0.15);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
