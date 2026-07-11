uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.90 + sin(p.y * 1.31 + t * 4.49) * 3.42 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.88;
	p = abs(p);
	p *= 1.35;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.40 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
