uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 11.36 - t * 1.52 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 27.07 - t * 5.61 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.92 / 3.1415927, 0.38 / r + time * 2.37);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.67 + time * 0.49);
	col *= clamp(r * 1.24, 0.0, 1.0);
	col *= 0.88 + 0.11 * sin(gl_FragCoord.y * 2.80 + time * 4.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
