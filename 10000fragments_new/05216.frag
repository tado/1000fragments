uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 37.85 - t * 6.25 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 36.93 - t * 2.89 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.75 / 3.1415927, 0.74 / r - time * 2.22);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.66 + time * 0.38);
	col *= clamp(r * 1.73, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
