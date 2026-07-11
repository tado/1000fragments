uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.79;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.54)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 29.84 - t * 4.42 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.06 - t * 0.50;
    v = sin(floor(lv * 5.6) / 5.6 * 6.2831853 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.41) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 0.67 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.93;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.16; q1 = rot2(0.87) * q1; }
	q2 = fract(q2 * 2.99) - 0.5;
	q2 = rot2(q2.y * -3.33 + (time * 0.69) * 0.86) * q2;
	float d1 = fieldA(q1, (time * 0.69), 0.0);
	float d2 = fieldB(q2, (time * 0.69), 0.10);
	float d3 = fieldC(q3, (time * 0.69), 1.18);
	d2 = max(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.46, 0.52, 0.47) + vec3(0.04, 0.00, 0.06);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.69)) * 100.0) - 0.5) * 0.10;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.922, 0.961, 1.022) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
