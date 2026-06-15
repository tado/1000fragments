uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.98 + sin(p.y * 2.65 + t * 5.91) * 1.15 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.27;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.05 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
