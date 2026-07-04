uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 22.64 - t * 1.82 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 28.52 - t * 2.19 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.71;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.79 / 3.1415927, 0.81 / r - time * 0.78);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.28 + time * 0.25);
	col *= clamp(r * 2.51, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
