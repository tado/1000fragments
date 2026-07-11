uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.45;
    v = 0.5 * (sin(3.0 * cp.x + t * 2.28) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 2.09) * sin(3.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.18 / 3.1415927, 0.81 / r + time * 0.62);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.78 + time * 0.30);
	col *= clamp(r * 2.81, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
