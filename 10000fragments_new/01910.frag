uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.60, 0.0)) * 13.80 - t * 7.14 + ph);
    float mb = sin(length(p + vec2(0.60, 0.0)) * 28.37 - t * 2.67 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.92 / 3.1415927, 0.60 / r - time * 2.59);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.21, 0.77, 0.33) * (0.07 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.83, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
