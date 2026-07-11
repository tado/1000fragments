uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 12.26 - t * 7.83 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 12.91 - t * 4.76 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.32 / 3.1415927, 1.14 / r + time * 1.42);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.15, 0.83, 1.08) + vec3(0.12, 0.09, 0.18);
	col *= clamp(r * 2.94, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
