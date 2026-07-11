uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.36, 0.0)) * 33.85 - t * 1.86 + ph);
    float mb = sin(length(p + vec2(0.36, 0.0)) * 39.48 - t * 6.06 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.53;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.60 / 3.1415927, 0.66 / r + time * 0.60);
	tv.x += tv.y * 0.12;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.03, 0.20, 0.05), vec3(0.57, 0.88, 0.56), cc);
	col *= clamp(r * 2.34, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
