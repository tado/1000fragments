uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 36.98 - t * 8.76 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	p += vec2(-0.95, -0.74) * sin(length(p) * 2.75 - time * 1.09) * 0.24;
	p = fract(p * 1.12) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.91 + time * 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
