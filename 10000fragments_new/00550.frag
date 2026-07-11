uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.32;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.47)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 20.19 - t * 5.01 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.11;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.41 / 3.1415927, 1.18 / r - time * 2.37);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.05, 0.24, 0.31), vec3(0.82, 0.59, 0.48), cc);
	col *= clamp(r * 2.21, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
