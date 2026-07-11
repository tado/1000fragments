uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.16 * vnoise2(p * 4.17 + t * 1.47);
    v = sin(wr * 13.37 - t * 1.61 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.51 + 0.30 * sin(t * 1.12)) + vec2(-0.79, -0.27) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 28; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 28.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.86;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.24)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 15.79 - t * 5.40 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.39 / wf * sin(wf * 2.18 * q2.y + time * 0.93); q2.y += 0.49 / wf * cos(wf * 2.97 * q2.x + time * 1.68); }
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	q3 += vec2(0.46, -0.70) * sin(length(q3) * 2.46 - time * 2.18) * 0.32;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.77);
	float d3 = fieldC(q3, time, 1.32);
	d2 = d2 * d3;
	float d = abs(d1 - d2);
	vec3 col = hue(d * 0.52 + time * 0.17);
	col = mod(col * 2.08, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
