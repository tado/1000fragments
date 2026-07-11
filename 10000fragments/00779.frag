uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.53 + sin(p.y * 2.66 + t * 4.46) * 2.81 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.97;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.25 + time * 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
