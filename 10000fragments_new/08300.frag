uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.54 - t * 8.06 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	p.x += sin(p.y * 7.87 + time * 1.69) * 0.24;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.34 + time * 0.03);
	col *= 0.89 + 0.19 * sin(gl_FragCoord.y * 2.51 + time * 17.76);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
