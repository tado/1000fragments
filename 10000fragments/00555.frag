uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.13 + sin(p.y * 2.81 + t * 1.29) * 3.23 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.05 + time * 0.27);
	col = fract(col * 1.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
